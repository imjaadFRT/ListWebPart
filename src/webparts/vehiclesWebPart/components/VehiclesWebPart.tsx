import * as React from "react";
import { useEffect, useState } from "react";
import styles from "./VehiclesWebPart.module.scss";
import { IVehiclesWebPartProps } from "./IVehiclesWebPartProps";
import { List } from "@fluentui/react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const VehiclesWebPart: React.FC<IVehiclesWebPartProps> = ({
  userDisplayName,
}: IVehiclesWebPartProps) => {
  const [data, setData] = useState([]);
  const getListData = async () => {
    const result = await sp.web.lists.getByTitle("ElectricModels").items.get();

    if (result?.length) setData(result);
    console.log(data);
  };
  useEffect(() => {
    console.log("Yay loaded", sp.web.currentUser);
    void getListData();
  }, []);

  const _onRenderCell = (item: any, index: any) => {
    return (
      <div
        style={{
          textAlign: "left",
          padding: 10,
          width: "100%",
        }}
      >
        <div>
          <b>{item.Title}</b>
        </div>
        <div>{item.FuelType}</div>
        <div>{item.Mileage}</div>
      </div>
    );
  };
  return (
    <section>
      <div className={styles.welcome}>
        <h2>Vehicle List</h2>

        <List items={data} onRenderCell={_onRenderCell} />
      </div>
    </section>
  );
};

export default VehiclesWebPart;
