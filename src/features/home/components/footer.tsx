export function Footer() {
  return (
    <footer className="bg-background/80 text-foreground absolute bottom-0 w-full border-t-[1px] border-gray-100/20 py-8">
      <div className="container mx-auto text-center transition-all duration-500">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Knowly. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
