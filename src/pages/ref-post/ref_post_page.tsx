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
import { ApiHelpers } from "../../helpers/api";
import Swal from "sweetalert2";
import { Urls } from "../../helpers/url";

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
        setCurrentData={setCurrentData}
        setIsEdit={setIsEdit}
        dataEdit={dataEdit}
        staticEdit={staticEdit}
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

  // ~*~ // Functions // ~*~ //
  const clearCurrentData = () => {
    setCurrentData(null);
  };

  const getRefPosts = async () => {
    ApiHelpers.get({
      url: Urls.refPost,
      successCallback: (response) => {
        setTableItems(response.data.data);
      },
      errorCallback: () => {},
    });
  };

  const addRefPost = async () => {
    const postBody: refPostType = {
      name: currentData?.name || "",
      code: parseInt(currentData?.code?.toString() || ""),
      type: currentData?.type || "",
    };
    ApiHelpers.post({
      url: Urls.refPost,
      data: postBody,
      successCallback: () => {
        Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
        getRefPosts();
        clearCurrentData();
      },
      errorCallback: () => {
        Swal.fire("Gagal", "Data gagal ditambahkan", "error");
      },
    });
  };

  const editRefPost = async () => {
    const postBody: refPostType = {
      id: currentData?.id,
      name: currentData?.name || "",
      code: parseInt(currentData?.code?.toString() || ""),
      type: currentData?.type || "",
    };
    ApiHelpers.put({
      url: Urls.refPost,
      data: postBody,
      successCallback: () => {
        Swal.fire("Berhasil", "Data berhasil diubah", "success");
        getRefPosts();
        clearCurrentData();
      },
      errorCallback: () => {
        Swal.fire("Gagal", "Data gagal diubah", "error");
      },
    });
  };

  const deleteRefPost = async (id: number) => {
    ApiHelpers.delete({
      url: `${Urls.refPost}/${id}`,
      successCallback: async () => {
        Swal.fire("Berhasil", "Data berhasil dihapus", "success");
        setTimeout(() => {}, 1000);
        getRefPosts();
        clearCurrentData();
      },
      errorCallback: () => {
        Swal.fire("Gagal", "Data gagal dihapus", "error");
      },
    });
  };

  // ~*~ // End of Functions // ~*~ //

  useEffect(() => {
    getRefPosts();
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
