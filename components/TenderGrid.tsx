"use client";

import { Grid, GridColumn } from "semantic-ui-react";
import { TenderModel } from "@/model/TenderModel";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Tender from "./Tender";

export default function TenderGrid() {
  const [tenders, setTenders] = useState<TenderModel[]>([] as TenderModel[]);

  useEffect(() => {
    axios.get<TenderModel[]>("http://localhost:8080/api/tenders").then((response) => {
      const data = response.data.filter(tender => {
        return tender.status !== 'finish'
      });
      setTenders(data);
    });
  }, []);

  return (
    <Grid doubling columns="1">
      <GridColumn>
        {tenders.map((tender) => (
          <Tender
            title={tender.author}
            author={tender.author}
            description={tender.description}
            status={tender.status}
            created={tender.created}
            cost={tender.cost}
            _id={tender._id}
          />
        ))}
      </GridColumn>
    </Grid>
  );
}
