import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { URL, doApiGet, doApiMethod } from "../services/apiService";

const EditUser = () => {
  const params = useParams();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [item, setItem] = useState({});

  useEffect(() => {
    doApiInit();
  }, []);

  const doApiInit = async () => {
    try {
      const url = URL + "/users/OtherInfo/" + params["id"];
      const data = await doApiGet(url);
      console.log(data);
      setItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  const doApiEdit = async (_bodyData) => {
    try {
      const url = URL + "/users/" + params["id"];
      const data = await doApiMethod(url, "PUT", _bodyData);

      if (data.modifiedCount) {
        toast.success("user updated");
        nav("/admin/users");
      }
    } catch (error) {
      alert("there problem2222");
    }
  };

  const onSub = (_bodyData) => {
    console.log(_bodyData);
    doApiEdit(_bodyData);
  };
  return (
    <div className="container">
      <h2 className="text-center p-3">Edit user! </h2>
      {item.name ? (
        <form onSubmit={handleSubmit(onSub)} className="col-md-6 mx-auto p-2">
          <label>Name:</label>
          <input
            defaultValue={item.name}
            {...register("name", { required: true, minLength: 2 })}
            type="text"
            className="form-control"
          />
          {errors.name && (
            <div className="text-danger">*Enter valid name(min 2 chars)</div>
          )}
          <label>User name:</label>
          <input
            defaultValue={item.user_name}
            {...register("user_name", { required: true, minLength: 2 })}
            type="text"
            className="form-control"
          />
          {errors.user_name && (
            <div className="text-danger">
              *Enter valid user_name(min 2 chars)
            </div>
          )}
          <label>Gender:</label>
          <input
            defaultValue={item.gender}
            {...register("gender", { required: true, minLength: 2 })}
            type="text"
            className="form-control"
          />
          {errors.gender && (
            <div className="text-danger">*Enter valid gender(min 2 chars)</div>
          )}
          <label>City:</label>
          <input
            defaultValue={item.city}
            {...register("city", { required: true, minLength: 2 })}
            type="text"
            className="form-control"
          />
          {errors.city && (
            <div className="text-danger">*Enter valid city(min 2 chars)</div>
          )}
          <label>Desc:</label>
          <input
            defaultValue={item.desc}
            {...register("desc", { required: true, minLength: 2 })}
            type="text"
            className="form-control"
          />
          {errors.desc && (
            <div className="text-danger">
              *Enter valid description(min 2 chars)
            </div>
          )}
          <button className="btn btn-info mt-3">Edit</button>
          <br></br>
          <button
            type="button"
            className="btn btn-info mt-3"
            onClick={() => {
              nav("/admin/users");
            }}
          >
            Back to list
          </button>
        </form>
      ) : (
        <h2>Loading..</h2>
      )}
    </div>
  );
};

export default EditUser;
