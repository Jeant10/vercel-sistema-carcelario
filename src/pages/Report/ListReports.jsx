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
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const ListReports = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getReports = async () => {
      try {
         await axios.get("https://appsistemacarcelario.herokuapp.com/api/v1/report", {
            headers: { accept: "application/json", authorization: token },
          })
          .then((response) => {
            console.log("Response", response);
            console.log(response.data.data.reports);
            setReports(response.data.data.reports);
          });
      } catch (e) {
        console.log(e);
      }
    };
    getReports();
  }, []);

  const buttonsTable = (cell, row, rowIndex) => {
    console.log("Row",row.id);
    return (
      <Box>
          <Button
            mb={3}
          w="70%"
          alignSelf={"center"}
          bg="#008080"
          _hover={{ bg: "#1A5064" }}
          onPress={() => {navigate(`/reports/show/${row.id}`)}}
        >
          <Text color="#DCD2BE" bold fontSize="15px">
            Show
          </Text>
        </Button>
          <Button
            mb={3}
          w="70%"
          alignSelf={"center"}
          bg="#075886"
          _hover={{ bg: "#1A5064" }}
          onPress={() => {navigate(`/reports/edit/${row.id}`)}}
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
  console.log("reports", reports);
  
  const columns = [
    {
      dataField: "id",
      text: "Report ID",
      sort: true,
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Created at",
      sort: true,
    },
    {
        dataField: "created_by.username",
        text: "Created at",
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
    <div>
      <h1 className="font-black text-4xl text-sky-900">Lista de Reports</h1>
      <div>
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={reports}
          columns={columns}
          striped
          hover
          pagination={paginationFactory({ sizePerPage: 5 })}
        />
      </div>
    </div>
  );
};
