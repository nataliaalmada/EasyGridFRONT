import { createContext, useState, useContext, useEffect } from "react";
import { getCookie } from "cookies-next";
import api from "../utils/api";

const PageInstContext = createContext({});

export const PageInstProvider = ({ children }) => {
  const [catsPageInst, setCatsPageInst] = useState([]);
  const [selectedPageCtx, setSelectedPageCtx] = useState({});
  const [contentCtx, setContentCtx] = useState([]);
  const [createFlagCtx, setCreateFlagCtx] = useState(true);
  const [imagesDataCtx, setImagesDataCtx] = useState([]);
  const [imgResizeCtx, setImgResizeCtx] = useState(null);
  const [pagesSize, setPagesSize] = useState(0);

  let urls = {
    development: process.env.NEXT_PUBLIC_API_URL_LOCAL,
    production: process.env.NEXT_PUBLIC_API_URL_DEPLOY,
  };

  // GET MAIN DATA
  async function loadCategoriasPageInst() {
    try {
      const { data } = await api.get("/catpageinst/getall");
      if (data.catsPageInst) {
        setCatsPageInst(data.catsPageInst);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getSizePages() {
    try {
      const { data } = await api.get("/pageinstitucional/getsize");
      if (data.pages) {
        setPagesSize(data.pages);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCategoriasPageInst();
    getSizePages();
  }, []);

  // ------------------------------------------- CATEGORIAS
  const createCatPageInst = async (name) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await api.post("/catpageinst/create", {
          name,
        });
        loadCategoriasPageInst();
        getSizePages();

        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCatPageInst = async (id, dataForm) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: resp } = await api.put(`/catpageinst/update/${id}`, {
          name: dataForm.name,
          active: dataForm.active,
        });
        loadCategoriasPageInst();
        getSizePages();

        return resp;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCatPageInst = async (id) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await api.delete(`/catpageinst/delete/${id}`);
        loadCategoriasPageInst();
        getSizePages();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ------------------------------------------- PÁGINAS
  const createPageInst = async (dataForm) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: resp } = await api.post("/pageinstitucional/create", {
          name: dataForm.name,
          title: dataForm.title,
          content: dataForm.content,
          images: dataForm.images ? dataForm.images : [],
          categoria_id: dataForm.categoria_id,
          user_id: dataForm.user_id,
        });
        loadCategoriasPageInst();
        getSizePages();
        return resp;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatePageInst = async (dataForm) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: resp } = await api.put(
          `/pageinstitucional/update/${dataForm.page_id}`,
          {
            name: dataForm.name,
            title: dataForm.title,
            content: dataForm.content,
            images: dataForm.images ? dataForm.images : [],
            categoria_id: dataForm.categoria_id,
            user_id: dataForm.user_id,
          }
        );
        loadCategoriasPageInst();
        getSizePages();
        return resp;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatePageInstActive = async (dataForm) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: resp } = await api.put(
          `/pageinstitucional/update-active/${dataForm.id}`,
          {
            active: dataForm.active,
          }
        );
        loadCategoriasPageInst();
        getSizePages();
        return resp;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePageInst = async (id) => {
    try {
      const token = getCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await api.delete(`/pageinstitucional/delete/${id}`);
        loadCategoriasPageInst();
        getSizePages();
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
    <PageInstContext.Provider
      value={{
        catsPageInst,
        setCatsPageInst,
        createCatPageInst,
        updateCatPageInst,
        updatePageInstActive,
        deleteCatPageInst,
        createPageInst,
        deletePageInst,
        loadCategoriasPageInst,
        selectedPageCtx,
        setSelectedPageCtx,
        updatePageInst,
        contentCtx,
        setContentCtx,
        createFlagCtx,
        setCreateFlagCtx,
        imagesDataCtx,
        setImagesDataCtx,
        loadImagesDataCtx,
        imgResizeCtx,
        setImgResizeCtx,
        pagesSize,
      }}
    >
      {children}
    </PageInstContext.Provider>
  );
};

export const usePageInstCtx = () => useContext(PageInstContext);
