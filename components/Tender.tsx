"use client";

import { TenderModel } from "@/model/TenderModel";
import { stat } from "fs";
import React from "react";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Button,
} from "semantic-ui-react";

export default function Tender({_id, title, author, description, status, created, cost}: TenderModel) {
  console.log(_id)
  let view = "";
  switch (status) {
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
    <Card style={{ width: "100%" }}>
      <CardContent>
        <CardHeader>{title}</CardHeader>
        <CardMeta>{author}</CardMeta>
        <CardDescription>
          {description}
        </CardDescription>
      </CardContent>
      <CardContent>
        <p>Статус: {view}</p>
        <p>Опубликовано: {created}</p>
      </CardContent>
      <Button onClick={() => {
        window.location.href=`/tenders/${_id}`
      }} attached="bottom" content="Подробнее" />
    </Card>
  );
}
