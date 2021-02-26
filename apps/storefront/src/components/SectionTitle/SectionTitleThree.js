const SectionTitleThree = ({ title, subtitle, link }) => {
  // fixed
  link = "/collection/4/camera-photo"
  return (
    <div className="d-flex justify-content-between container wide space-mb--r80">
      <div className="section-title-container text-left">
        <h3
          className={`section-title ${subtitle ? "space-mb--20" : ""}`}
        >
          {title}
        </h3>
      </div>
      <div className="text-right">
        {link ? (
          <h4 className="section-title--secondary section-title--secondary--style2" style={{whiteSpace: "nowrap"}}>
            <a href={link}>View more</a>
          </h4>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SectionTitleThree;
