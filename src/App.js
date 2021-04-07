import React from "react";
import "./App.css"
import {
    BrowserRouter as Router,
} from "react-router-dom";
import Card from "@material-ui/core/Card"
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DoneIcon from '@material-ui/icons/Done';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import WorkIcon from '@material-ui/icons/Work';
import TextField from '@material-ui/core/TextField';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [
                { id: 0, editable: 0, title: "CSE 141L Lab 4", date: "3/20/21", desc: "Complete a fully functional 9-bit CPU. Whether the CPU functions correctly of not will entirely determine your course grade.", status: '0' },
                { id: 1, editable: 0, title: "CSE 141 Assesment 5", date: "3/15/21", desc: "Exam", status: '1' },
                { id: 2, editable: 0, title: "IT Action file upload", date: "3/4/21", desc: "Upload the html file to hanaroenterprise server.", status: '2' },
            ]
        };

        this.addTask = this.addTask.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    addTask() {
        this.state.tasks.push({id: this.state.tasks.length, editable: 1, title: "Title", date: "Date", desc: "Description", status: "0"});
        this.setState((state) => {
            return { tasks: state.tasks }
        });
    }

    makeEditable(id, edit) {
        this.state.tasks[id].editable = edit;
        this.setState((state) => {
            return { tasks: state.tasks }
        });
    }

    changeTitle(id, title) {
        this.state.tasks[id].title = title;
        this.setState((state) => {
            return { tasks: state.tasks }
        });
    }

    changeDate(id, date) {
        this.state.tasks[id].date = date;
        this.setState((state) => {
            return { tasks: state.tasks }
        });
    }

    changeDesc(id, desc) {
        this.state.tasks[id].desc = desc;
        this.setState((state) => {
            return { tasks: state.tasks }
        });
    }

    deleteTask(id) {
        this.state.tasks.splice(id, 1);
        for(var i = 0; i < this.state.tasks.length; i++) {
            this.state.tasks[i].id = i;
        }
        this.setState((state) => {
            return { tasks: state.tasks }
        });
    }

    render() {
        return (
        <Router
            basename={"/todo"}
        >
            <div className="App">
                <Header addTask={this.addTask}/>
                <Tasks deleteTask={this.deleteTask} makeEditable={this.makeEditable} changeTitle={this.changeTitle} changeDate={this.changeDate} changeDesc={this.changeDesc} tasks={this.state.tasks} />
            </div>
        </Router>
        );
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
    return (
        <AppBar style={{ background: '#2E3B55' }}>
            <Toolbar className="header">
                <Typography variant="h6" className="headerTODO">
                    Tasks
                </Typography>
                <IconButton onClick={this.props.addTask} className="Add" color="inherit" >
                    <AddIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
    }
}

class Tasks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( <div className="Tasks">
            { this.props.tasks.map((task) => (
                <Task deleteTask={this.props.deleteTask} id={task.id} makeEditable={this.props.makeEditable} changeTitle={this.props.changeTitle} changeDate={this.props.changeDate} changeDesc={this.props.changeDesc} editable={task.editable} title={task.title} date={task.date} desc={task.desc} status={task.status}/>
            ))}
        </div>
    );
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.status = this.status.bind(this);
        this.statusColor = this.statusColor.bind(this);
        this.statusIcon = this.statusIcon.bind(this);

        this.changeTitle = this.changeTitle.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.submitChange = this.submitChange.bind(this);


        this.state = {
            anchorEl: null,
            id: this.props.id,
            title: this.props.title,
            date: this.props.date,
            desc: this.props.desc
        }
    }


    changeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    changeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    changeDesc(e) {
        this.setState({
            desc: e.target.value
        });
    }


    submitChange() {
        this.setState({anchorEl: null});
        this.props.changeTitle(this.state.id, this.state.title);
        this.props.changeDate(this.state.id, this.state.date);
        this.props.changeDesc(this.state.id, this.state.desc);
        this.props.makeEditable(this.state.id, 0);
    }

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    status = (n) => {
        switch(n) {
            case '0':
                return "Not Started";
            case '1':
                return "Working";
            case '2':
                return "Completed";
        }
    }

    statusColor = (n) => {
        switch(n) {
            case '0':
                return "red";
            case '1':
                return "yellow";
            case '2':
                return "green";
        }
    }

    statusIcon = (n) => {
        switch(n) {
            case '0':
                return <CloseIcon style={{color: "red"}}/>;
            case '1':
                return <WorkIcon style={{color: "yellow"}}/>;
            case '2':
                return <DoneIcon style={{color: "green"}}/>;
        }
    }

    render() {
    if (this.props.editable == 0) {
    return (
    <Card className="Task">
        <CardContent style={{ paddingBottom: 0}}>
            <div className="titleBar">
            <Typography variant="h5" component="h2" className="titleText">
                {this.props.title}
            </Typography>
            <IconButton onClick={this.handleClick}>
                <MoreVertIcon className="optionsIcon"/>
            </IconButton>
            <Menu
                id="fade-menu"
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                keepMounted
                onClose={this.handleClose}
            >
                <MenuItem onClick={() => {this.props.makeEditable(this.props.id, 1)}}>Edit</MenuItem>
                <MenuItem onClick={() => {this.setState({anchorEl: null}); this.props.deleteTask(this.props.id)}}>Delete</MenuItem>
            </Menu>
          </div>
          <Typography color="textSecondary" style={{ marginBottom: 10 }}>
            Due: { this.props.date }
          </Typography>
          <Typography variant="body2" component="p" style={{ maxWidth: 500 }}>
            { this.props.desc }
          </Typography>
          <div className="statusBar">
          < IconButton style={{ marginBottom: 0}}>
                { this.statusIcon(this.props.status) }
          </IconButton>
            <Typography variant="body2" component="p" style={{ color: this.statusColor(this.props.status), marginBottom: 0}}>
                { this.status(this.props.status) }
            </Typography>
          </div>
        </CardContent>
      </Card>);
    }
    else {
        return (
            <Card className="Task">
        <CardContent style={{ paddingBottom: 0, flexDirection: "column", display: "flex"}}>
            <div className="titleBar">
            
            <TextField value={this.state.title} onChange={this.changeTitle} style={{width: 300}} multiline className="titleText" id="standard-basic" label="Title" />

            <IconButton onClick={this.handleClick}>
                <MoreVertIcon className="optionsIcon"/>
            </IconButton>
            <Menu
                id="fade-menu"
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                keepMounted
                onClose={this.handleClose}
            >
                <MenuItem onClick={this.submitChange}>Done</MenuItem>
                <MenuItem onClick={() => {this.setState({anchorEl: null}); this.props.deleteTask(this.props.id)}}>Delete</MenuItem>
            </Menu>
          </div>


          <TextField value={this.state.date} onChange={this.changeDate} id="standard-basic" multiline label="Due Date" style={{width: 200}}/>
          <TextField value={this.state.desc} onChange={this.changeDesc} id="standard-basic" multiline label="Description" component="p" style={{ width: 450 }}/>


          <div className="statusBar">
          < IconButton style={{ marginBottom: 0}}>
                { this.statusIcon(this.props.status) }
          </IconButton>
            <Typography variant="body2" component="p" style={{ color: this.statusColor(this.props.status), marginBottom: 0}}>
                { this.status(this.props.status) }
            </Typography>
          </div>
        </CardContent>
      </Card>
      );
    }
    }
}
