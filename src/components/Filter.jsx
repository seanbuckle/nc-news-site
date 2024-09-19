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
        <label htmlFor="filter-btn" className="btn btn--filter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
          </svg>
          Filters
        </label>
        <input type="checkbox" name="" id="filter-btn" />
        <aside className="site-filter">
          <label htmlFor="filter-btn">close</label>
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