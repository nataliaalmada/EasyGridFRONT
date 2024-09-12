import { createContext, useState, useContext, useEffect } from "react";
import { getCookie } from "cookies-next";
import api from "../utils/api";

const NoticiasContext = createContext({});

export const NoticiasProvider = ({ children }) => {
  const [catsNoticias, setCatsNoticias] = useState([]);
  const [selectedNoticiaCtx, setSelectedNoticiaCtx] = useState({});
  const [contentCtx, setContentCtx] = useState([]);
  const [imagesDataCtx, setImagesDataCtx] = useState([]);
  const [imgResizeCtx, setImgResizeCtx] = useState(null);
  const [noticiasSize, setNoticiasSize] = useState(0);
  const [allNoticiasCtx, setAllNoticiasCtx] = useState([]);

  let urls = {
    development: process.env.NEXT_PUBLIC_API_URL_LOCAL,
    production: process.env.NEXT_PUBLIC_API_URL_DEPLOY,
  };

  // GET MAIN DATA
  async function loadCategoriasNoticias() {
    try {
      const { data } = await api.get("/catnoticias/getall");
      if (data.catsNoticias) {
        setCatsNoticias(data.catsNoticias);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getSizeNoticias() {
    try {
      const { data } = await api.get("/noticias/getsize");
      if (data.pages) {
        setNoticiasSize(data.pages);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCategoriasNoticias();
    getSizeNoticias();
    getAllNoticias();
  }, []);

  // ------------------------------------------- CATEGORIAS
  const createCatNoticias = async (name) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await api.post("/catnoticias/create", {
          name,
        });
        loadCategoriasNoticias();

        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCatNoticias = async (id, dataForm) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: resp } = await api.put(`/catnoticias/update/${id}`, {
          name: dataForm.name,
          active: dataForm.active,
        });
        loadCategoriasNoticias();
        getSizeNoticias();

        return resp;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCatNoticias = async (id) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await api.delete(`/catnoticias/delete/${id}`);
        loadCategoriasNoticias();
        getSizeNoticias();

        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ------------------------------------------- NOTÍCIAS

  async function getAllNoticias() {
    try {
      const { data } = await api.get("/noticias/getall");
      if (data.pages) {
        setAllNoticiasCtx(data.pages);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const createNoticias = async (dataForm) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: resp } = await api.post("/noticias/create", {
          name: dataForm.name,
          title: dataForm.title,
          content: dataForm.content,
          thumbnail: dataForm.thumbnail,
          categoria_id: dataForm.categoria_id,
          is_event: dataForm.is_event,
          date_event: dataForm.date_event,
          user_id: dataForm.user_id,
        });
        loadCategoriasNoticias();
        getSizeNoticias();
        getAllNoticias();

        return resp;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateNoticias = async (dataForm) => {
    console.log(dataForm);
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: resp } = await api.put(
          `/noticias/update/${dataForm.page_id}`,
          {
            name: dataForm.name,
            title: dataForm.title,
            content: dataForm.content,
            thumbnail: dataForm.thumbnail,
            categoria_id: dataForm.categoria_id,
            is_event: dataForm.is_event,
            date_event: dataForm.date_event,
            user_id: dataForm.user_id,
          }
        );
        loadCategoriasNoticias();
        getSizeNoticias();
        getAllNoticias();

        return resp;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateNoticiasActive = async (dataForm) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: resp } = await api.put(
          `/noticias/update-active/${dataForm.id}`,
          {
            active: dataForm.active,
          }
        );
        loadCategoriasNoticias();
        getSizeNoticias();
        getAllNoticias();

        return resp;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNoticias = async (id) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await api.delete(`/noticias/delete/${id}`);
        loadCategoriasNoticias();
        getSizeNoticias();
        getAllNoticias();

        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // GET ALL IMAGES
  async function loadImagesDataCtx() {
    let newFiles = [];
    try {
      const { data } = await api.get("/public/files");
      if (data.files) {
        await Promise.all(
          data.files
            .map(async (file) => {
              newFiles.push({
                name: file.name,
                fileName: file.fileName,
                size: file.size,
                width: file.width,
                height: file.height,
                source:
                  urls[process.env.NODE_ENV] + "/uploads/" + file.fileName,
                time: file.time,
              });
            })
            .sort((a, b) => b.time - a.time)
        );
      }
      setImagesDataCtx(newFiles);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    loadImagesDataCtx();
  }, []);

  return (
    <NoticiasContext.Provider
      value={{
        catsNoticias,
        setCatsNoticias,
        createCatNoticias,
        updateCatNoticias,
        deleteCatNoticias,
        createNoticias,
        updateNoticias,
        updateNoticiasActive,
        deleteNoticias,
        selectedNoticiaCtx,
        setSelectedNoticiaCtx,
        contentCtx,
        setContentCtx,
        imagesDataCtx,
        setImagesDataCtx,
        loadImagesDataCtx,
        imgResizeCtx,
        setImgResizeCtx,
        noticiasSize,
        allNoticiasCtx,
      }}
    >
      {children}
    </NoticiasContext.Provider>
  );
};

export const useNoticiasCtx = () => useContext(NoticiasContext);
