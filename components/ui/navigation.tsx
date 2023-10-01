export default function Navigation() {
  return (
    <div className="navigation">
      <div className="nav-item">Home</div>
      <div className="nav-item">Lead</div>
      <div className="nav-item">Acount</div>
      <div className="nav-item">Contact</div>
      <div className="nav-item">Opportunity</div>

      <style jsx>{`
        .navigation {
          width: 90%;
          height: 35px;
          margin: 0 auto;
          margin-top: 15px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          column-gap: 16px;
          align-items: center;
          font-size: 14px;
        }

        .nav-item {
          cursor: pointer;
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 15px;
          border: 1px solid #dedede;
          box-shadow: #dedede 2.4px 2.4px 3.2px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
