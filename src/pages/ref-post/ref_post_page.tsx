import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/16/solid";
import DefaultLayout from "../../layouts/default_layout";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import ManipulateRefPostDialog from "./manipulate_ref_post_modal";
import { useEffect, useState } from "react";
import { refPostType } from "../../core/interfaces/data";
import { breadcrumsItem } from "../../core/interfaces/props";
import Breadcrumb from "../../components/breadcrumb";
import axios from "axios";
import { getBaseUrl } from "../../helpers/api";
import Swal from "sweetalert2";

export default function RefPostPage() {
  // ~*~ // Manipulate Modal // ~*~ //
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentData, setCurrentData] = useState<refPostType | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const renderManipulateComponent = ({
    staticEdit,
    dataEdit,
  }: {
    staticEdit: boolean;
    dataEdit?: refPostType;
  }) => {
    return (
      <ManipulateRefPostDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        currentData={currentData}
        setIsEdit={setIsEdit}
        dataEdit={dataEdit}
        staticEdit={staticEdit}
        setCurrentData={setCurrentData}
        onSave={handleOnSaveManipulate}
      />
    );
  };

  const handleOnSaveManipulate = () => {
    if (!isEdit) {
      addRefPost();
    } else {
      editRefPost();
    }
  };

  // ~*~ // End of Manipulate Modal // ~*~ //

  // ~*~ // Table // ~*~ //
  const [tableItems, setTableItems] = useState<refPostType[]>([]);

  const tableHeaderItems: string[] = [
    "Nama Akun",
    "Kode Akun",
    "Tipe Akun",
    "Aksi",
  ];

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Akun Ref Post",
      href: "ref",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  const clearCurrentData = () => {
    setCurrentData(null);
  };

  const getRefPostData = async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/ref/private/post`);
      setTableItems(res.data.data);
      console.log("getRefPostData", res);
    } catch (error) {
      console.log("getRefPostData error", error);
    }
  };

  const addRefPost = async () => {
    try {
      const postBody: refPostType = {
        name: currentData?.name || "",
        code: parseInt(currentData?.code?.toString() || ""),
        type: currentData?.type || "",
      };
      const res = await axios.post(
        `${getBaseUrl()}/ref/private/post`,
        postBody
      );
      Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
      getRefPostData();
      clearCurrentData();
      console.log("addRefPost", res);
    } catch (error) {
      console.log("addRefPost error", error);
    }
  };

  const editRefPost = async () => {
    try {
      const postBody: refPostType = {
        id: currentData?.id,
        name: currentData?.name || "",
        code: parseInt(currentData?.code?.toString() || ""),
        type: currentData?.type || "",
      };
      const res = await axios.put(`${getBaseUrl()}/ref/private/post`, postBody);
      Swal.fire("Berhasil", "Data berhasil diubah", "success");
      getRefPostData();
      clearCurrentData();
      console.log("editRefPost", res);
    } catch (error) {
      console.log("editRefPost error", error);
    }
  };

  const deleteRefPost = async (id: number) => {
    try {
      const res = await axios.delete(`${getBaseUrl()}/ref/private/post/${id}`);
      Swal.fire("Berhasil", "Data berhasil dihapus", "success");
      getRefPostData();
      console.log("deleteRefPost", res);
    } catch (error) {
      console.log("deleteRefPost error", error);
    }
  };

  useEffect(() => {
    getRefPostData();
  }, []);

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Akun Ref Post</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Akun Ref Post</h1>

        <div className="flex justify-between mt-4">
          {renderManipulateComponent({ staticEdit: false })}
          <div className="flex gap-2">
            <Input placeholder="Cari" type="search" />
            <Button color="primary" isIconOnly>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Table aria-label="Periode Table" className="mt-8">
          <TableHeader>
            {tableHeaderItems.map((item, index) => (
              <TableColumn key={index} className="text-center">
                {item}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent="Data tidak ditemukan">
            {tableItems.map((data) => (
              <TableRow key={data.id} className="bg-gray-50">
                <TableCell className="text-center">{data.name}</TableCell>
                <TableCell className="text-center">{data.code}</TableCell>
                <TableCell className="text-center">{data.type}</TableCell>
                <TableCell className="text-center flex justify-evenly">
                  {renderManipulateComponent({
                    staticEdit: true,
                    dataEdit: {
                      id: data.id,
                      name: data.name,
                      code: data.code,
                      type: data.type,
                    },
                  })}
                  <TrashIcon
                    className="text-danger w-6 h-6"
                    onClick={() => deleteRefPost(data?.id || 0)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DefaultLayout>
  );
}
