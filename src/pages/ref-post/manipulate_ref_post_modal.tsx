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
import { propsManipulateRefPost } from "@/core/interfaces/props";

export default function ManipulateRefPostModal({
  isOpen,
  onOpen,
  onOpenChange,
  currentData,
  setCurrentData,
  setIsEdit,
  dataEdit,
  staticEdit,
  onSave,
}: propsManipulateRefPost) {
  const typeAccount = [
    {
      key: 1,
      label: "Aktiva",
    },
    {
      key: 2,
      label: "Kewajiban",
    },
    {
      key: 3,
      label: "Modal",
    },
    {
      key: 4,
      label: "Pendapatan",
    },
    {
      key: 5,
      label: "Beban",
    },
  ];

  return (
    <>
      {staticEdit ? (
        <PencilIcon
          className="text-black w-8 h-8"
          onClick={() => {
            setIsEdit(true);
            setCurrentData(dataEdit!);
            onOpen();
          }}
        />
      ) : (
        <Button
          className="w-max"
          color="primary"
          onPress={() => {
            setIsEdit(false);
            onOpen();
          }}
          startContent={<PlusIcon className="w-8 h-8" />}
        >
          Ref Post
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Ref Post
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Nama Akun"
                  placeholder="Masukkan nama akun"
                  variant="bordered"
                  defaultValue={currentData?.name || ""}
                  onChange={(e) => {
                    setCurrentData({
                      ...currentData,
                      name: e.target.value,
                      id: currentData?.id || 0,
                      code: parseInt(currentData?.code?.toString() || "0"),
                      type: currentData?.type || "",
                    });
                  }}
                />
                <Dropdown>
                  <DropdownTrigger>
                    <div className="">
                      <Input
                        label="Tipe Akun"
                        placeholder="Pilih tipe akun"
                        variant="bordered"
                        className="cursor-pointer"
                        value={currentData?.type || ""}
                        defaultValue={currentData?.type || "Pilih tipe akun"}
                        readOnly
                      />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {typeAccount.map((item, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => {
                          setCurrentData({
                            ...currentData,
                            type: item.label,
                            id: currentData?.id || 0,
                            name: currentData?.name || "",
                            code: parseInt(
                              currentData?.code?.toString() || "0"
                            ),
                          });
                        }}
                      >
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Input
                  label="Kode Akun"
                  placeholder="Masukkan kode akun"
                  variant="bordered"
                  type="number"
                  defaultValue={currentData?.code?.toString() || ""}
                  onChange={(e) => {
                    setCurrentData({
                      ...currentData,
                      code: parseInt(e.target.value),
                      id: currentData?.id || 0,
                      name: currentData?.name || "",
                      type: currentData?.type || "",
                    });
                  }}
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
