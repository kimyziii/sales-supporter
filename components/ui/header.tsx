import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      {/* 로고 / 검색 컴포넌트 / 프로필 */}

      {/* 로고 */}
      <Link href="/" className="presentation" role="presentation">
        <img
          className="logo"
          src="/images/sales-support-logo.png"
          alt="salesSupportLogo"
        />
      </Link>

      {/* 검색 */}
      <div className="searchWrapper">
        <input className="searchInput" />
        <img className="searchIcon" src="/icons/search.svg" />
      </div>

      {/* 프로필 */}
      <div className="presentation" role="presentation">
        <img className="image" src="/icons/profile.svg" alt="profileLogo" />
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 15px;
        }

        .presentation {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .searchWrapper {
          display: flex;
          align-items: center;
          border: 1px solid #666666;
          border-radius: 7px;
          width: calc((100vw - 150px) * 0.75);
          height: 30px;
          padding: 0 5px;
          gap: 8px;
        }

        .searchInput {
          width: calc(100% - 23px);
          border: none;
          padding: 0 10px;
        }

        .searchInput:focus,
        .searchInput:hover {
          outline: none;
        }

        .searchIcon {
          width: 23px;
          cursor: pointer;
        }

        .logo {
          width: 150px;
        }

        .image {
          width: 30px;
        }
      `}</style>
    </header>
  );
}
