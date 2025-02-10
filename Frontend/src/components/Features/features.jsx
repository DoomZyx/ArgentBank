import FeaturesItemData from "../../data/featuresItems/featuresItem.json";
import Item from "../../components/FeaturesItems/FeaturesItem";
import iconChat from "../../assets/img/icon-chat.webp";
import iconMoney from "../../assets/img/icon-money.webp";
import iconSecurity from "../../assets/img/icon-security.webp";

function Features() {
  const imageData = {
    "icon-chat.webp": iconChat,
    "icon-money.webp": iconMoney,
    "icon-security.webp": iconSecurity,
  };
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {FeaturesItemData.map((data) => (
        <Item
          key={data.id}
          image={imageData[data.image]}
          descriptionImage={data.descriptionImage}
          title={data.title}
          description={data.description}
        />
      ))}
    </section>
  );
}
export default Features;
