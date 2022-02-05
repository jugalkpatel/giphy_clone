import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  GIFIcon,
  LogoText,
  Nav,
  Form,
  Submit,
  InputField,
  Logo,
  SearchIcon,
} from "./Navbar.styles";

function Navbar() {
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text) {
      navigate(`/search/${text}`);
    }
  };

  return (
    <Nav>
      <Logo to="/">
        <GIFIcon />
        <LogoText>GIPHY</LogoText>
      </Logo>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <InputField value={text} onChange={handleInputChange} />
        <Submit>
          <SearchIcon />
        </Submit>
      </Form>
    </Nav>
  );
}

export { Navbar };
