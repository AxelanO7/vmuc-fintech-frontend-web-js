import { PencilIcon, PlusIcon } from "@heroicons/react/16/solid";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  actionType,
  propsManipulateEmployee,
} from "../../core/interfaces/props";

export default function ManipulateEmployeeModal({
  isOpen,
  onOpen,
  onOpenChange,
  currentData,
  setCurrentData,
  setIsEdit,
  dataEdit,
  action,
  onSave,
}: propsManipulateEmployee) {
  const typePosition = [
    {
      key: 1,
      label: "Karyawan",
    },
    {
      key: 2,
      label: "FO",
    },
  ];

  const isEdit = action === actionType.EDIT;

  return (
    <>
      {isEdit ? (
        <PencilIcon
          className="text-secondary w-8 h-8"
          onClick={() => {
            setCurrentData(dataEdit!);
            setIsEdit(true);
            onOpen();
          }}
        />
      ) : (
        <Button
          className="w-max"
          color="primary"
          onPress={() => {
            setCurrentData(null);
            setIsEdit(false);
            onOpen();
          }}
          startContent={<PlusIcon className="w-8 h-8" />}
        >
          Karyawan
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Karyawan
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Nama Karyawan"
                  placeholder="Masukkan nama Karyawan"
                  variant="bordered"
                  defaultValue={isEdit ? currentData?.name : ""}
                  onChange={(e) =>
                    setCurrentData({
                      ...currentData!,
                      name: e.target.value,
                      address: currentData?.address || "",
                      phone: currentData?.phone || "",
                      position: currentData?.position || "",
                    })
                  }
                />
                <Dropdown>
                  <DropdownTrigger>
                    <div className="">
                      <Input
                        label="Jabatan"
                        placeholder="Pilih jabatan"
                        variant="bordered"
                        value={currentData?.position}
                        className="cursor-pointer"
                        defaultValue={
                          isEdit ? currentData?.position : "Pilih jabatan"
                        }
                        readOnly
                      />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {typePosition.map((item, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => {
                          setCurrentData({
                            ...currentData!,
                            position: item.label,
                            name: currentData?.name || "",
                            address: currentData?.address || "",
                            phone: currentData?.phone || "",
                          });
                        }}
                      >
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Input
                  label="No Telepon"
                  placeholder="Masukkan no telepon"
                  variant="bordered"
                  defaultValue={isEdit ? currentData?.phone : ""}
                  onChange={(e) =>
                    setCurrentData({
                      ...currentData!,
                      phone: e.target.value,
                      name: currentData?.name || "",
                      address: currentData?.address || "",
                      position: currentData?.position || "",
                    })
                  }
                />
                <Input
                  label="Alamat"
                  placeholder="Masukkan alamat"
                  variant="bordered"
                  defaultValue={isEdit ? currentData?.address : ""}
                  onChange={(e) =>
                    setCurrentData({
                      ...currentData!,
                      address: e.target.value,
                      name: currentData?.name || "",
                      phone: currentData?.phone || "",
                      position: currentData?.position || "",
                    })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onSave();
                    onClose();
                  }}
                >
                  Simpan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
