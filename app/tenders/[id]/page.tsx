"use client";

import { Context } from "@/app/layout";
import ItemsTable from "@/components/ItemsTable";
import itemsTable from "@/components/ItemsTable";
import { TenderModel } from "@/model/TenderModel";
import { User } from "@/model/User";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Dimmer,
  Input,
  Loader,
  Table,
  TableBody,
  TableCell,
  Image,
  TableRow,
} from "semantic-ui-react";

export default function ({ params }: any) {
  const { id } = params;
  const [tender, setTender] = useState<any>();
  const [author, setAuthor] = useState<User>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get("https://hackathon-backend-nine.vercel.app/api/tenders/" + id).then((response) => {
      setTender(response.data);

      axios
        .get("https://hackathon-backend-nine.vercel.app/api/users/" + response.data.userId)
        .then((response) => {
          setAuthor(response.data);
        });
    });
    setLoading(false);
  }, []);

  const { store } = useContext(Context);
  let view = "";
  switch (tender?.status) {
    case "search":
      view = "В поиске";
      break;
    case "proccess":
      view = "В процессе";
      break;
    case "finish":
      view = "Завершен";
      break;
  }

  return (
    <>
      {isLoading ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <Container>
          <h2>Тендер пользователя {author?.login}</h2>
          <Table fixed>
            <TableBody>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>{tender?.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Описание</TableCell>
                <TableCell>{tender?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Запланированная сумма</TableCell>
                <TableCell>{tender?.cost} тенге</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Дата создание</TableCell>
                <TableCell>{tender?.created}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Статус</TableCell>
                <TableCell>{view}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Image style={{margin: '0 auto'}} src={'https://hackathon-backend-nine.vercel.app/static/' + tender?.picture} size='medium' bordered />
          {tender?.accepted ? (
            ""
          ) : (
            <Button
              content="Принять заказ"
              onClick={() => {
                tender.accepted = store.user.id;
                tender.status = "proccess";
                axios
                  .put(
                    "https://hackathon-backend-nine.vercel.app/api/tenders/" + tender?._id,
                    tender
                  )
                  .then((response) => {
                    setAuthor(response.data);
                  });
              }}
            />
          )}
          {tender?.status === "proccess" || tender?.status === "finish" ? (
            <ItemsTable tender={tender} />
          ) : (
            ""
          )}
        </Container>
      )}
    </>
  );
}
