"use client";

import { Context } from "@/app/layout";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  Container,
  Dimmer,
  Image,
  Loader,
  Menu,
  MenuItem,
  MenuMenu,
} from "semantic-ui-react";

function Navbar() {
  const pathname = usePathname();

  const HandleCreateTender = () => {
    window.location.href = "http://localhost:3000/create";
  };

  const { store } = useContext(Context);

  return (
    <Menu stackable size="massive">
      <Container>
        <img style={{width: 100}} src="/logo.jpg" />

        <MenuItem
          name="tenders"
          active={pathname === "/tenders"}
          onClick={() => (window.location.href = "/tenders")}
        >
          Список тендеров
        </MenuItem>

        <MenuItem
          name="archive"
          active={pathname === "/archive"}
          onClick={() => (window.location.href = "/archive")}
        >
          Архив
        </MenuItem>

        <MenuItem
          name="archive"
          active={pathname === "/create"}
          onClick={HandleCreateTender}
        >
          Обьявить тендер
        </MenuItem>

        {store.isLoading ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : store.isAuth ? (
          store.isActivate ? (
            <MenuItem
              position="right"
              name="archive"
              active={pathname === "/create"}
              onClick={HandleCreateTender}
            >
              {store.user.login}
            </MenuItem>
          ) : (
            <div>Подтвердите Почту</div>
          )
        ) : (
          <MenuMenu position="right">
            <MenuItem
              name="registration"
              active={pathname === "/registration"}
              onClick={() => (window.location.href = "/registration")}
            >
              Регистрация
            </MenuItem>
            <MenuItem
              name="login"
              active={pathname === "/login"}
              onClick={() => (window.location.href = "/login")}
            >
              Авторизация
            </MenuItem>
          </MenuMenu>
        )}
      </Container>
    </Menu>
  );
}

export default observer(Navbar);
