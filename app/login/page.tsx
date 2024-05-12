"use client";

import { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormInput,
  Grid,
  Message,
} from "semantic-ui-react";
import { InputFile } from "semantic-ui-react-input-file";
import { Context } from "../layout";
import React from "react";
import { observer } from "mobx-react-lite";

function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {store} = useContext(Context);

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: "100%" }}>
        <Container>
          <h2>Авторизация</h2>
          <Form unstackable>
            <FormInput label="Почта" placeholder="Почта" onChange={(e) => {
              setEmail(e.target.value)
            }} />
            <FormInput label="Пароль" placeholder="пароль" type="password" onChange={(e) => {
              setPassword(e.target.value)
            }} />
            <Button
              style={{ display: "block", marginTop: "1rem" }}
              type="submit"
              onClick={() => {
                store.login(email, password)
                
              }}
            >
              Создать
            </Button>
          </Form>
        </Container>
      </Grid.Column>
    </Grid>
  );
}

export default observer(login)