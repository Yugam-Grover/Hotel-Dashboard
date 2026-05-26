import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { Moon, Sun, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../features/authentication/UserAvatar";
import { useDarkMode } from "../context/DarkModeToggle";

const StyledHeader = styled.div`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 2px solid var(--color-grey-50);
  display: flex;
  gap: 0.5rem;
  justify-content: end;
`;

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <UserAvatar />
      <StyledHeaderMenu>
        <li>
          <ButtonIcon onClick={() => navigate("/account")}>
            <User />
          </ButtonIcon>
        </li>
        <li>
          <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <Sun /> : <Moon />}
          </ButtonIcon>
        </li>
        <li>
          <Logout />
        </li>
      </StyledHeaderMenu>
    </StyledHeader>
  );
};

export default Header;
