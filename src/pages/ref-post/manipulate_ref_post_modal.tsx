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
import { paramsManipulateRefPost } from "../../core/interfaces/params";

export default function ManipulateRefPostModal({
  isOpen,
  onOpen,
  onOpenChange,
  accountName,
  setAccountName,
  accountCode,
  setAccountCode,
  accountType,
  setAccountType,
  dataEdit,
  action,
  onSave,
}: paramsManipulateRefPost) {
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

  const isEdit = action === "edit";

  return (
    <>
      {isEdit ? (
        <PencilIcon
          className="text-secondary w-10 h-10"
          onClick={() => {
            setAccountName(dataEdit?.accountName || "");
            setAccountCode(dataEdit?.accountCode || "");
            setAccountType(dataEdit?.accountType || "");
            onOpen();
          }}
        />
      ) : (
        <Button className="w-max" color="primary" onPress={onOpen}>
          <PlusIcon className="w-5 h-5" />
          Ref Post
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEdit ? "Edit " : "Tambah "}
                Ref Post
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Nama Akun"
                  placeholder="Masukkan nama akun"
                  variant="bordered"
                  defaultValue={isEdit ? accountName : ""}
                  onChange={(e) => setAccountName(e.target.value)}
                />
                <Dropdown>
                  <DropdownTrigger>
                    <div className="">
                      <Input
                        label="Tipe Akun"
                        placeholder="Pilih tipe akun"
                        variant="bordered"
                        value={accountType}
                        className="cursor-pointer"
                        defaultValue={isEdit ? accountType : "Pilih tipe akun"}
                        readOnly
                      />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {typeAccount.map((item, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => {
                          setAccountType(item.label);
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
                  defaultValue={isEdit ? accountCode : ""}
                  onChange={(e) => setAccountCode(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onSave({ action });
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
