import { LogOut } from "lucide-react";
import useLogout from "./useLogout";
import ButtonIcon from "../../ui/ButtonIcon";
const Logout = () => {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      <LogOut />
    </ButtonIcon>
  );
};

export default Logout;
