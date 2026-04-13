import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const StyledMain = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-100);
`;
const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledAppLayout>
  );
};

export default AppLayout;
