export default function Navbar() {
  return (
    <>
      <nav className="bg-slate-800 sticky top-0 z-50 flex items-center justify-between px-60 py-5 text-white">
        <div className=" font-bold text-3xl">
            <span className="text-purple-500">&lt; </span>
            <span>Pass</span>
            <span className="text-green-500">Word</span>
            <span className="text-purple-500"> /&gt;</span>
        </div>
        <ul>
          <li className="flex gap-10 font-semibold text-2xl hover:font-extrabold  uppercase">
            <a href="">Home</a>
            <a href="">About</a>
            <a href="">Contact</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
