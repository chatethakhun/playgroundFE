const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full p-3">
      <div className="flex-1 flex flex-col gap-4">{children}</div>
    </div>
  )
}

export default PageContainer
