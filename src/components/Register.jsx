import React from 'react';

function Register() {
    console.log("===========register==============");
    return (
        <div className="App">
            <div class="container h-100">
                <div class="row h-100">
                    <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div class="d-table-cell align-middle">
                            <div class="text-center mt-4">
                                <h1 class="h2">Get started</h1>
                                <p class="lead">
                                    Start creating the best possible user experience for you customers.
                                </p>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="m-sm-4">
                                        <form>
                                            <div class="form-group">
                                                <label>Name</label>
                                                <input class="form-control form-control-lg" type="text" name="name"
                                                    placeholder="Enter your name" />
                                            </div>
                                            <div class="form-group">
                                                <label>Company</label>
                                                <input class="form-control form-control-lg" type="text" name="company"
                                                    placeholder="Enter your company name" />
                                            </div>
                                            <div class="form-group">
                                                <label>Email</label>
                                                <input class="form-control form-control-lg" type="email" name="email"
                                                    placeholder="Enter your email" />
                                            </div>
                                            <div class="form-group">
                                                <label>Password</label>
                                                <input class="form-control form-control-lg" type="password" name="password"
                                                    placeholder="Enter password" />
                                            </div>
                                            <div class="text-center mt-3">
                                                <a href="index.html" class="btn btn-lg btn-primary">Sign up</a>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        </div>
    );
}

export default Register;
