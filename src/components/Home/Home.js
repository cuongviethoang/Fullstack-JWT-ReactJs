import React from "react";
import "./Home.scss";
import images from "../../assets/images";

function Home() {
    return (
        <div className="home-container">
            <div className="container">
                <h3>Về dự án này :</h3>
                <p>
                    Trong dự án này, mình tự học và làm chủ ngôn ngữ javascript,
                    cụ thể như sau:
                </p>
                <p>
                    1. Thư viện React.JS : công cụ siêu mạnh mẽ, giúp xây dựng
                    giao diện website tương tự Facebook, Instagram...
                </p>
                <p>
                    2. Framework Express & Platform Node.JS Bằng việc sử dụng
                    framework Express trên nền tảng Node.JS, mình đã viết server
                    Node.JS theo chuẩn RESTful APIs, phục vụ cho giao diện
                    frontend React.
                </p>
                <p>
                    3. Hiểu cách Tư Duy & Tự Design được database SQL : cơ sở dữ
                    liệu quan hệ MySQL.
                </p>
                <p>
                    4. Thiết Kế giao diện website Responsive: một fullstack
                    developer không chỉ biết "code cho chạy được", mình đã làm
                    đúng nghĩa của một người biết cả "frontend lẫn backend". Vì
                    vậy, việc design một giao diện website trông "tốt" và tự
                    động "co giãn" trên nhiều thiết bị là điều cực kỳ cần thiết.
                    Với công cụ Bootstrap 5, việc kiểm soát, sở hữu một giao
                    diện resposive với React chưa từng dễ đến vậy.
                </p>
                <div>
                    <h5>Các chức năng chính trong dự án:</h5>
                    <div>
                        <p>1. Đăng kí, đăng nhập cho người dùng.</p>
                        <div className="row d-flex flex-column align-items-center gap-3 flex-lg-row justify-content-lg-center">
                            <img
                                src={images.signup}
                                className="image"
                                alt="login user"
                            />
                            <img
                                src={images.login}
                                className="image"
                                alt="login user"
                            />
                        </div>
                    </div>
                    <p>
                        3. Áp dụng kỹ thuật public routes và private routes vào
                        dự án
                    </p>
                    <p>2. Áp dụng kỹ thuật phân trang vào dự án</p>
                    <div>
                        <p>4. CRUD người dùng</p>
                        <div className="text-center">
                            <img
                                src={images.crudUser}
                                className="image"
                                alt="crud user"
                            />
                        </div>
                    </div>
                    <div>
                        <p>5.CRUD vai trò của người dùng</p>
                        <div className="text-center">
                            <img
                                src={images.crudRole}
                                className="image"
                                alt="crud roles"
                            />
                        </div>
                    </div>
                    <div>
                        <p>6.Gán vai trò cho nhóm người dùng</p>
                        <div className="row d-flex flex-column align-items-center gap-3 flex-lg-row justify-content-lg-center">
                            <img
                                src={images.assignRoleGuest}
                                className="image "
                                alt="crud roles"
                            />
                            <img
                                src={images.assignRoleCustomer}
                                className="image"
                                alt="crud roles"
                            />
                            <img
                                src={images.assignRoleDev}
                                className="image"
                                alt="crud roles"
                            />
                            <img
                                src={images.assignRoleLeader}
                                className="image"
                                alt="crud roles"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
