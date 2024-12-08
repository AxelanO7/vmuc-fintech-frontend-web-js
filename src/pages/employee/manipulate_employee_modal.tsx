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
import { propsManipulateEmployee } from "../../core/interfaces/props";

export default function ManipulateEmployeeModal({
  isOpen,
  onOpen,
  onOpenChange,
  employeeName,
  setEmployeeName,
  employeePhoneNumber,
  setEmployeePhoneNumber,
  employeeAddress,
  setEmployeeAddress,
  employeePosition,
  setEmployeePosition,
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

  const isEdit = action === "edit";

  return (
    <>
      {isEdit ? (
        <PencilIcon
          className="text-secondary w-10 h-10"
          onClick={() => {
            setEmployeeName(dataEdit?.name || "");
            setEmployeePhoneNumber(dataEdit?.phoneNumber || "");
            setEmployeeAddress(dataEdit?.address || "");
            setEmployeePosition(dataEdit?.position || "");
            onOpen();
          }}
        />
      ) : (
        <Button
          className="w-max"
          color="primary"
          onPress={onOpen}
          startContent={<PlusIcon className="w-5 h-5" />}
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
                  defaultValue={isEdit ? employeeName : ""}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
                <Dropdown>
                  <DropdownTrigger>
                    <div className="">
                      <Input
                        label="Jabatan"
                        placeholder="Pilih jabatan"
                        variant="bordered"
                        value={employeePosition}
                        className="cursor-pointer"
                        defaultValue={
                          isEdit ? employeePosition : "Pilih jabatan"
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
                          setEmployeePosition(item.label);
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
                  defaultValue={isEdit ? employeePhoneNumber : ""}
                  onChange={(e) => setEmployeePhoneNumber(e.target.value)}
                />
                <Input
                  label="Alamat"
                  placeholder="Masukkan alamat"
                  variant="bordered"
                  defaultValue={isEdit ? employeeAddress : ""}
                  onChange={(e) => setEmployeeAddress(e.target.value)}
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
