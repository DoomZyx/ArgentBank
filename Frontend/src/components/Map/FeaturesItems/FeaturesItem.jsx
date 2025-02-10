   function Item({ image, descriptionImage, title, description }) {
    return (
      <div className="feature-item">
        <img src={image} alt={descriptionImage} className="feature-icon" />
        <h3 className="feature-title">{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
  
  export default Item;
