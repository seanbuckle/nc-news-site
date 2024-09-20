function Filter({ searchParams, setSearchParams }) {
  const setOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  const setSortBy = (sort) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sort);
    setSearchParams(newParams);
  };

  return (
    <>
      <input type="checkbox" name="" id="filter-btn" />
      <label className="scrim" htmlFor="filter-btn"></label>
      <aside className="site-filter">
        <label htmlFor="filter-btn" className="btn btn--icon site-filter__close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </label>
        <nav>
          <h2>Filters</h2>
          <h3>Order</h3>
          <ul>
            <li>
              <input
                type="radio"
                name="order"
                id="ascending"
                className="site-filter__item"
                onClick={() => setOrder("asc")}
              />
              <label htmlFor="ascending">Ascending</label>
            </li>
            <li>
              <input
                type="radio"
                name="order"
                id="descending"
                className="site-filter__item"
                onClick={() => setOrder("desc")}
                defaultChecked
              />
              <label htmlFor="descending">Descending</label>
            </li>
          </ul>
          <h3>Sort by</h3>
          <ul>
            <li>
              <input
                type="radio"
                name="sort"
                id="date"
                className="site-filter__item"
                onClick={() => setSortBy("created_at")}
                defaultChecked
              />
              <label htmlFor="date">Date</label>
            </li>
            <li>
              <input
                type="radio"
                name="sort"
                id="title"
                className="site-filter__item"
                onClick={() => setSortBy("title")}
              />
              <label htmlFor="title">Title</label>
            </li>
            <li>
              <input
                type="radio"
                name="sort"
                id="author"
                className="site-filter__item"
                onClick={() => setSortBy("author")}
              />
              <label htmlFor="author">Author</label>
            </li>
            <li>
              <input
                type="radio"
                name="sort"
                id="votes"
                className="site-filter__item"
                onClick={() => setSortBy("votes")}
              />
              <label htmlFor="votes">Votes</label>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Filter;
