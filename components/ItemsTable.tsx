import { Context } from "@/app/layout";
import { Item } from "@/model/Item";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Dimmer,
  Input,
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";

function ItemsTable({ tender }: any) {
  const [action, setAction] = useState<String>();
  const [money, setMoney] = useState<String>();
  const [items, setItems] = useState<Item[]>([] as Item[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { store } = useContext(Context);
  console.log(tender?.accepted);
  console.log(store.user.id);
  useEffect(() => {
    if (tender) {
      axios
        .get("http://localhost:8080/api/items/" + tender._id)
        .then((response) => {
          setItems(response.data);
        });
    }

    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <>
          <Table fixed>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Что сделано</TableHeaderCell>
                <TableHeaderCell>Затрачено</TableHeaderCell>
                <TableHeaderCell>Создано</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow>
                  <TableCell>{item?.action}</TableCell>
                  <TableCell>{item?.money}</TableCell>
                  <TableCell>{item?.created}</TableCell>
                </TableRow>
              ))}
              {store.user.id != tender?.accepted ? (
                ""
              ) : tender?.status === "finish" ? (
                ""
              ) : (
                <TableRow>
                  <TableCell>
                    <Input
                      style={{ width: "100%" }}
                      placeholder="..."
                      onChange={(e) => {
                        setAction(e.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      style={{ width: "100%" }}
                      placeholder="..."
                      onChange={(e) => {
                        setMoney(e.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {store.user.id == tender?.accepted ? (
            tender?.status === "finish" ? (
              ""
            ) : (
              <>
                <Button
                  content="Добавить отчет"
                  onClick={() => {
                    axios.post("http://localhost:8080/api/items", {
                      tenderId: tender?._id,
                      action,
                      money,
                    });

                    axios
                      .get("http://localhost:8080/api/items/" + tender._id)
                      .then((response) => {
                        setItems(response.data);
                      });

                    window.location.href = "/tenders/" + tender._id;
                  }}
                />
                <Button
                  negative
                  content="Завершить тендер"
                  onClick={() => {
                    tender.status = "finish";
                    axios.put(
                      "http://localhost:8080/api/tenders/" + tender?._id,
                      tender
                    );
                    window.location.href = "/tenders/" + tender._id;
                  }}
                />
              </>
            )
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}

export default observer(ItemsTable);
