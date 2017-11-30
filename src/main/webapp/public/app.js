var EMPLOYEES = [
    {name: 'Joe Biden', age: 45, years: 5},
    {name: 'President Obama', age: 54, years: 8},
    {name: 'Crystal Mac', age: 34, years: 12},
    {name: 'James Henry', age: 33, years: 2}
];

var Employee = React.createClass({
    handleDelete : function () {
        var self = this;
        $.ajax({
            url: self.props.employee._links.self.href,
            type: 'DELETE',
            success: function(result) {
                self.setState({display: false});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    },
    render: function() {
        if(this.state.display == false) return null;
        return (
            <tr>
                <td>{this.props.employee.name}</td>
                <td>{this.props.employee.age}</td>
                <td>{this.props.employee.years}</td>
                <td><button className="btn btn-info" onClick={this.l}> Delete </button></td>
            </tr>);
    }
});

var EmployeeTable = React.createClass({
    render: function() {
        var rows = [];
           this.props.employees.forEach(function(employee) {
               rows.push(<Employee employee={employee} />);
           });
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Years</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
});

ReactDOM.render(
    <EmployeeTable employees={EMPLOYEES} />, document.getElementById('root')
);

var App = React.createClass({
    loadEmployeesFromServer: function () {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/employees"
        }).then(function (data) {
            self.setState({employees: data._embedded.employees});
        });
    },
    getInitialState: function () {
        return {employees: []};
    },
    componentDidMount: function () {
        this.loadEmployeesFromServer();
    },
    render() {
        return ( <EmployeeTable employees={this.state.employees}/> );
    }
});