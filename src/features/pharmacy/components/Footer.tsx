
export default function Footer() {
  return (
    <div className="mt-12 pt-8 border-t pb-4 px-4 ">
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date()?.getFullYear()} My Med-X. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="hover:text-foreground ">
            Help
          </button>
          <button className="hover:text-foreground">
            Support
          </button>
          <button className="hover:text-foreground ">
            Privacy
          </button>
        </div>
      </div>
    </div>
  );
}
