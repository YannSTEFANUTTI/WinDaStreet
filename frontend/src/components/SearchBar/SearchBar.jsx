/* eslint-disable import/no-unresolved */
import "./SearchBar.css";
import { useEffect, useState } from "react";
import api from "@services/api";
import { useDetectClickOutside } from "react-detect-click-outside";
import gsap from "gsap";
import loupe from "../../assets/loupe.png";
import SearchBarResult from "./SearchBarResult";

function SearchBar() {
  const [allResult, setAllResult] = useState();
  const [filterResult, setFilterResult] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleInput = () => {
    if (window.matchMedia("(max-width: 767px").matches) {
      gsap
        .timeline()
        .to(".SearchBarInput", { opacity: 1, duration: 0 })
        .to(".UserNameNavbar", { opacity: 0, duration: 1 })
        .to(".SearchBarInput", { width: "60vw", duration: 1 }, "<");
      setTimeout(() => setIsOpen(true), 1000);
    }
  };

  const detectClickOutside = useDetectClickOutside({
    onTriggered: () => {
      if (window.matchMedia("(max-width: 767px").matches && isOpen === true) {
        setTimeout(() => {
          setFilterResult();
          gsap
            .timeline()
            .to(".SearchBarInput", { width: 0, duration: 1 })
            .to(".UserNameNavbar", { opacity: 1, duration: 1 }, "<")
            .to(".SearchBarInput", { opacity: 0, duration: 0 });
          setIsOpen(false);
        }, 100);
      } else {
        setFilterResult();
      }
    },
  });

  const handleFilterResult = (e) => {
    const search = e.target.value.toLowerCase();
    if (search) {
      const filter = [];
      allResult.map((result) => {
        if (
          result.artiste.toLowerCase().includes(search) &&
          filter.filter(
            (checkIfExist) => result.artiste === checkIfExist.result
          ).length === 0
        ) {
          filter.push({
            id: result.artiste_id,
            type: "artiste",
            result: result.artiste,
          });
        } else if (
          result.quartier_name.toLowerCase().includes(search) &&
          filter.filter(
            (checkIfExist) => result.quartier_name === checkIfExist.result
          ).length === 0
        ) {
          filter.push({
            id: result.quartier_id,
            type: "quartier",
            result: result.quartier_name,
          });
        } else if (result.name.toLowerCase().includes(search)) {
          filter.push({ id: result.id, type: result, result: result.name });
        }
        return 1;
      });
      setFilterResult(filter);
    } else {
      setFilterResult();
    }
  };
  useEffect(() => {
    api
      .get("/art")
      .then((res) => setAllResult(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="SearchBarContainer">
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Rechercher"
          onChange={handleFilterResult}
          onFocus={handleFilterResult}
          className="SearchBarInput"
          ref={detectClickOutside}
        />
        <div onClick={handleInput} onKeyDown={handleInput} role="none">
          <img src={loupe} alt="loupe" />
        </div>
      </div>
      {filterResult && <SearchBarResult results={filterResult} />}
    </div>
  );
}

export default SearchBar;
