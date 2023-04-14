export class Employee{
    name: string;
    email: string;
    salary: number;
    position: string;
    age: number;

    constructor(employee: Employee)
    {
        this.name = employee.name;
        this.email = employee.email;
        this.salary = employee.salary;
        this.position = employee.position;
        this.age = employee.age;
    }
}