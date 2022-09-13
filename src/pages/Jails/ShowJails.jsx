import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Box,Button,Text} from 'native-base';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";



export const ShowJails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [jails, setJails] = useState([]);

  useEffect(() => {
    const getJails = async () => {
      try {
        const response = await axios
          .get("https://appsistemacarcelario.herokuapp.com/api/v1/jail", {
            headers: { accept: "application/json", authorization: token },
          })
          .then((response) => {
            console.log("Response", response);
            console.log(response.data.data.jails);
            setJails(response.data.data.jails);
          });
      } catch (e) {
        console.log(e);
      }
    };
    getJails();
  }, []);


  const buttonsTable = (cell, row, rowIndex) => {
    return (
      <Box>
          <Button
            mb={3}
          w="70%"
          alignSelf={"center"}
          bg="#075886"
          _hover={{ bg: "#1A5064" }}
          //onPress={() => onPressEdit(row)}
        >
          <Text color="#DCD2BE" bold fontSize="15px">
            Editar
          </Text>
        </Button>
        <Button
        
          alignSelf={"center"}
          w="70%"
          _hover={{ bg: "danger.700" }}
          bg={"danger.800"}
          leftIcon={<FontAwesomeIcon icon={faXmark} color="black" />}
         // onPress={() => onDelete(row)}
        >
          <Text color="#DCD2BE" bold fontSize="15px">
            Eliminar
          </Text>
        </Button>
      
      </Box>
    );
  };
  console.log("jails", jails);
  const columns = [
    {
      dataField: "id",
      text: "Carcel ID",
      sort: true,
    },
    {
      dataField: "name",
      text: "Nombre Carcel",
      sort: true,
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
    },
    {
        dataField: "buttons",
        text: "Acciones",
        formatter: buttonsTable,
        headerAling: "center",
    }
  ];

  return (
    // <Container>
    //   <Center>
    //     <Text>Lista de Carceles</Text>
    //   </Center>
    // </Container>
    <div>
      <h1 className="font-black text-4xl text-sky-900">Lista de Carceles</h1>
      <div>
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={jails}
          columns={columns}
          striped
          hover
          pagination={paginationFactory({ sizePerPage: 5 })}
        />
      </div>
    </div>
  );
};
