import { House, CalendarSearch, Warehouse, User, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
    flex-shrink: 0;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const MainNav = () => {
  return (
    <div>
      <NavList>
        <li>
          <StyledNavLink to="dashboard">
            <House />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="bookings">
            <CalendarSearch />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="cabins">
            <Warehouse />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="users">
            <User />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="settings">
            <Settings />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </div>
  );
};

export default MainNav;
