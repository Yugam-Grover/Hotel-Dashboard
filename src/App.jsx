import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
const H1 = styled.h1`
  font-weight: 100px;
`;
const StyledApp = styled.div`
  background-color: orangered;
`;
const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Hello World!</H1>
        <Button onClick={() => alert("this is onclick event")}>click</Button>
        <Button>click</Button>
        <Input placeholder="number of guests" />
        <Input placeholder="number of guests" />
      </StyledApp>
      ;
    </>
  );
};

export default App;
