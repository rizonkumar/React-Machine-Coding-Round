import data from "../constants/data.json";
import Accordion from "./Accordian";
const Faq = () => {
  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {data.faqs.map((faq, index) => (
          <Accordion key={index} qna={faq} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
