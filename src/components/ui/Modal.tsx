import { memo } from 'react'
import ReactModal from 'react-modal'
import Modal from 'rsuite/Modal'

const CustomModal = memo(
  ({
    children,
    onClose,
    modalIsOpen,
  }: {
    children: React.ReactNode
    onClose: () => void
    modalIsOpen: boolean
    customStyles?: ReactModal.Styles
  }) => {
    return (
      <Modal
        open={modalIsOpen}
        onClose={onClose}
        // style={customStyles}
      >
        {children}
      </Modal>
    )
  },
)

export default CustomModal
