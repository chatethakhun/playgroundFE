import { cn } from '@/utils/cn'
import { MessageSquareWarning } from 'lucide-react'
import {
  confirmable,
  createConfirmation,
  type ConfirmDialogProps,
} from 'react-confirm'
import { useTranslation } from 'react-i18next'
import Button from './Button'

const MyDialog = ({
  show,
  proceed,
  message,
  cancel,
}: ConfirmDialogProps<{ message: string }, boolean>) => {
  const { t } = useTranslation('common')
  return (
    <div
      id="popup-modal"
      className={cn(
        'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full h-dvh',
        { hidden: !show },
      )}
    >
      <div className="relative p-4 w-full max-w-md max-h-full m-auto h-dvh flex flex-col justify-center">
        <div
          className="relative bg-white rounded-lg shadow-md dark:bg-gray-700 m-auto "
          style={{ width: 'clamp(300px, 100%, 500px)' }}
        >
          <div className="p-4 md:p-5 text-center flex flex-col items-center">
            <MessageSquareWarning className="w-20 h-20 text-red-400 mb-5" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>

            <div className="flex gap-2">
              <Button
                onClick={() => proceed(true)}
                data-modal-hide="popup-modal"
                type="button"
              >
                {t('common:confirm')}
              </Button>
              <Button
                secondary
                onClick={cancel}
                data-modal-hide="popup-modal"
                type="button"
              >
                {t('common:cancel')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const confirm = createConfirmation(confirmable(MyDialog))
