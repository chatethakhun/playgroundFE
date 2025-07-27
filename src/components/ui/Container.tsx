const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary h-full px-8 py-10 rounded-t-3xl flex flex-col gap-3">
      {children}
    </div>
  )
}

export default Container
