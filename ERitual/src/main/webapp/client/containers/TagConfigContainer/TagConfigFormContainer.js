import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';

import validateInput from '../../validations/tagConfigValidation';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import setAuthToken from '../../utils/setAuthToken';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';

class TagConfigFormContainer extends Component {
	constructor(props){
		super(props);
		// We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
		this.state = {
				tagKey: '',
				value:'',
				errors:{},
				success:{},
				isLoading:false,
				firstTimeFormSubmit:false,
				submitApplied:false,
				scroll:'',
				selectedTagValues:[],
				configValue:''

		}

		this.onChange = this.onChange.bind(this);// bind(this) is needed here,
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollPage=this.scrollPage.bind(this);
		this.onClick=this.onClick.bind(this);
		this.removeTag = this.removeTag.bind(this)
	}


	onChange(event) {
		this.state.submitApplied=false;
		this.setState({ [event.target.name]:event.target.value}, function() {
			if(this.state.firstTimeFormSubmit) {
				this.isValid();
			}
		});
	}
	onTagChange (event, { newValue }) {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested({ value }) {
		console.log(value);
		this.props.tagConfigRenderList(value).then(this.keyRenderOptions)
	}

	keyRenderOptions() {
		if(this && !this.props.tagConfig && this.props.tagConfig.tagConfigData ==undefined) {
			return [];
		}
		else if(this && this.props.tagConfig.tagConfigData!=undefined && this.props.tagConfig.tagConfigData.length==0 && this.state.selectedTagValues.indexOf(this.state.value) == -1 && this.state.selectedTagValues.length==0) {
			return [`Add ${this.state.value} to the list?`];
		}
		else if(this && this.props.tagConfig.tagConfigData!=undefined){
			if(this.props.tagConfig.tagConfigData.length!=0){
				const tagList = this.props.tagConfig.tagConfigData.map((d) => 
				{
					return d.key;
				});
				return _.difference(tagList, this.state.selectedTagValues);
			}
		}

	}

	renderSuggestion(suggestion) {
		if (suggestion.isAddNew) {
			return (
					<span>
					[+] Add new: <strong>{this.state.value}</strong>
					</span>
			);
		}
		return suggestion
	}

	valueRenderOptions() {
		if(this.props.tag!=undefined){
			if(this.props.tag.length!=0){
				const valueList = this.props.tag.data.items.map((d) => 
				{
					return (<option key={d.value}>{d.value}</option>
					)
				});
				return valueList;
			}
		}
	}

	onClick(event){
		this.context.router.push('/ERitual/tagConfig');
	}


	// method to check the validity of the form
	isValid() {
		// deconstruct the props
		const {errors, isValid } = validateInput(this.state);
		// if(!isValid) {
		this.setState({ errors });
		if(this.state.submitApplied)
			this.scrollPage({errors});
		// }
		return isValid;
	}

	//method to scroll the page on reload
	scrollPage(error){

		for(var scroll in error.errors)
		{
			this.state.scroll= scroll;
			break;                                        
		} 
		let elmnt = document.getElementById('tagConfig-form');
		for(var i=0; i<elmnt.length; i++){
			if(elmnt[i].name==this.state.scroll)
			{
				elmnt[i].focus();
				break;
			}
		}
		if(this.state.scroll=='')
		{
			let elmnt = document.querySelector('.site-container');
			elmnt.scrollIntoView();
		}
		this.setState({scroll:''});
	}

	onSubmit(event) {
		event.preventDefault();
		this.state.submitApplied=true;
		this.setState({ firstTimeFormSubmit : true })
		//condition for checking the validation
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading:true });
			let title;
			let type;
			let keyName=(this.state.value).split(".");
			for(var i=0;i<keyName.length;i++){
				title=keyName[2];
			}
			let tagConfig= {
					value:{
						"type":title,
						"title":title,
						"tags":this.state.value
					}
			}
			console.log("tagConfig",tagConfig);
			this.props.userTagConfigFormsRequest(tagConfig).then(
					(res) => {
						//condition for unauthorized admin
						if(!res.payload.response && res.payload.status==600) {
							this.props.addToast({  type:'error', 
								text:`Sorry,you are not authorized to create or update tagConfig, please contact to your  admin`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/tagConfig');
						}
						//conditon for duplicate tagConfig name
						else if(res.payload.status==204){
							this.setState({ errors : { "form" : "TagConfig Name already exist" }, isLoading : false })
						}
						//conditon when response is not null
						else{
							res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
							let tagConfigFormData= res.payload.data;
							if(tagConfigFormData.message!= null) {
								this.setState({ errors : { "form" : tagConfigFormData.message }, isLoading : false })
							}
							else {
								this.props.addToast({  type:'success', 
									text:`TagConfig created successfully`, 
									toastType:'auto'  });
								this.context.router.push('/ERitual/tagConfig');
							}
						}
					},
			);
		}
	}
	getSuggestionValue(suggestion) {
		if (suggestion.isAddNew) {
			return this.state.value;
		}

		return suggestion;
	};

	onSuggestionSelected(event, { suggestion }){
		if (suggestion.isAddNew) {
			console.log('Add new:', this.state.value);
		}
		this.setState({
			selectedTagValues : suggestion.toString().indexOf('to the list') == -1 ? this.state.selectedTagValues.concat(suggestion.toString()) : this.state.selectedTagValues.concat(this.state.value)
		},() => {
			document.querySelector('.react-autosuggest__input').value = "";
			this.sevaTagRenderOptions();
		});

	};

	onSuggestionsClearRequested() {

	}

	sevaTagRenderOptions() {
		this.props.tagByKeyRequest(this.state.selectedTagValues).then(
				(res) => {
					let configValue=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
					if(configValue.value.overview)
					{
						this.context.router.push('/ERitual/aboutUs');
					}
					else{
						this.state.configValue=configValue.value.tags;
						this.state.showOverview=false;
					}
				})
	}


	createTag() {
		let tagsList = this.state.selectedTagValues.map((tag) => 
		{
			return (
					<li key={tag} className = "tag"><span>{tag}</span><a className="close-tag" onClick = {(event) => {event.preventDefault();this.removeTag(tag);}}>x</a></li>
			)
		});
		return tagsList;
	}

	removeTag(tag) {
		let selectedTagList = this.state.selectedTagValues;
		selectedTagList = [...selectedTagList.slice(0,selectedTagList.indexOf(tag)),...selectedTagList.slice(selectedTagList.indexOf(tag)+1)]
		this.setState({
			selectedTagValues : selectedTagList
		});
	}

	render() {
		const {errors ,success,configValue,tagKey,value,isLoading,checked,showOverview} = this.state;
		const inputProps = {
				placeholder: 'Key',
				value,
				onChange: this.onTagChange.bind(this)
		};
		const suggestions = ["a","b"];
		return (
				<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmit} id="tagConfig-form">
				<h2 className="mt0 mb20 text-center">TagConfig Form</h2>
				<div className="row mb30">
				<div className="col-xs-12">
				<hr/>
				</div>
				</div>
				{ errors.form && <div className="alert alert-danger">{errors.form}</div> }
				<div className="row mb10">
				<div className="col-xs-5 ">
				<label>Key</label>
				<Autosuggest
				suggestions={this.keyRenderOptions() ? this.keyRenderOptions() : [] }
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
				getSuggestionValue={this.getSuggestionValue.bind(this)}
				renderSuggestion={this.renderSuggestion.bind(this)}
				inputProps={inputProps}
				focusFirstSuggestion={true}
				onSuggestionSelected={this.onSuggestionSelected.bind(this)}
				/>
				{/*<ul className = "selectedTags">{this.createTag()}</ul>*/}
					</div>
				{ showOverview && <div className="col-xs-5 col-md-5">
				<textarea 
				cols="43"
					rows="6"
						onChange={this.onChange}
				name="configValue"
					placeholder = "configValue"
						value={configValue}
				className="wordText messageColor"
					/></div>}
				{!showOverview && <div className="col-xs-6 col-md-6">
				<TextFieldGroup
				error={errors.value}
				label="Value"
					onChange={this.onChange}
				value={configValue}
				name="configValue"
					field="configValue"
						/>
						</div>}

				</div>
				<div className="row mt30">
				<div className="col-md-4 col-md-offset-4">
				<div className="btn-toolbar">
				<button type="button" disabled={this.state.isLoading} onClick={this.onClick} className="btn btn-lg btn-primary">
				Cancel
				</button>
				<button  disabled={this.state.isLoading} className="btn btn-lg btn-primary">
				Submit
				</button>
				</div>
				</div>
				</div>
				</form>
		);
				}
	}



	TagConfigFormContainer.contextTypes = {
			router:React.PropTypes.object.isRequired
	}

	export default TagConfigFormContainer;