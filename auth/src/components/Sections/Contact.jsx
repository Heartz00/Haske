import React from "react";
import styled from "styled-components";
// Assets
import ContactImg1 from "../../assets/img/contact-1.png";
import ContactImg2 from "../../assets/img/contact-2.png";
import ContactImg3 from "../../assets/img/contact-3.png";

export default function Contact() {
  return (
    <Wrapper id="contact">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Get in Touch: Let's Discuss Innovative Health Solutions</h1>
            <p className="font15">
              Is your institution looking to integrate innovative digital imaging and diagnostic tools?
              <br />
              At Haske, we are committed to enhancing operational efficiency and advancing medical diagnostics. If your institution is interested in exploring a partnership or implementing Haske in your operations, we would be delighted to discuss how we can support your goals.
              
            </p>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form>
                <label className="font13">Institution Name:</label>
                <input type="text" id="institution" name="institution" className="font20 extraBold" />
                <label className="font13">Contact Person:</label>
                <input type="text" id="contact" name="contact" className="font20 extraBold" />
                <label className="font13">Email Address:</label>
                <input type="email" id="email" name="email" className="font20 extraBold" />
                <label className="font13">What is your Inquiry:</label>
                <textarea rows="4" cols="50" type="text" id="message" name="message" className="font20 extraBold" placeholder="Feel free to ask any specific questions or provide additional information." />
              </Form>
              <SumbitWrapper className="flex">
                <ButtonInput type="submit" value="Submit Inquiry" className="pointer animate radius8" style={{ maxWidth: "220px" }} />
              </SumbitWrapper>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex">
            
              <div style={{ width: "50%" }}>
                <div style={{ marginTop: "100px" }}>
<img src={ContactImg3} alt="office" className="radius6" style={{ width: "500px", height: "300px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Form = styled.form`
  padding: 70px 0 30px 0;
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;
const ButtonInput = styled.input`
  border: 1px solid #dd841a;
  background-color: #0F172A;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  :hover {
    background-color: #dd841a;
    border: 1px solid #0F172A;
    color: #fff;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;


const ContactImgBox = styled.div`
  max-width: 180px; 
  align-self: flex-end; 
  margin: 10px 30px 10px 0;
`;
const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;
