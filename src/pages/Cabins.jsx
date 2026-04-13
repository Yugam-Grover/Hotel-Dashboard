import { GetCabins } from "../services/cabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  GetCabins().then((data) => console.log(data));
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://xkcabzcgizaxcqqhqeyf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" />
    </Row>
  );
}

export default Cabins;
