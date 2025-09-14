import { memo } from 'react'
import ReactModal from 'react-modal'
const styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
const CustomModal = memo(
  ({
    children,
    onClose,
    modalIsOpen,
    customStyles = styles,
  }: {
    children: React.ReactNode
    onClose: () => void
    modalIsOpen: boolean
    customStyles?: ReactModal.Styles
  }) => {
    return (
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </ReactModal>
    )
  },
)

export default CustomModal
