import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="w-full px-3 sm:px-6 pt-2 pb-3"
    >
      <label htmlFor="search-field" className="sr-only">
        Search Songs
      </label>

      <div
        className="
          group

          flex
          items-center

          w-full

          rounded-2xl

          bg-white/10
          backdrop-blur-xl

          border
          border-white/10

          transition-all
          duration-300

          focus-within:border-cyan-400/60
          focus-within:shadow-[0_0_25px_rgba(34,211,238,0.25)]
        "
      >
        <FiSearch
          className="
            ml-4

            text-gray-400

            text-xl

            transition-all

            duration-300

            group-focus-within:text-cyan-400
          "
        />

        <input
          id="search-field"
          name="search-field"
          type="search"
          autoComplete="off"

          value={searchTerm}

          onChange={(e) =>
            setSearchTerm(e.target.value)
          }

          placeholder="Search songs, artists..."

          className="
            flex-1

            bg-transparent

            outline-none

            border-none

            px-4
            py-4

            text-white

            placeholder:text-gray-400

            text-sm
            sm:text-base
          "
        />

      </div>

    </form>
  );
};

export default Searchbar;