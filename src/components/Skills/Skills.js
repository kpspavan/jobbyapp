const Skills = props => {
  const {skillsarray2} = props
  const {imageUrl, name} = skillsarray2
  return (
    <li className="job-flex">
      <div className="job1-flex">
        <img className="img-skill" src={imageUrl} alt={name} />
        <h1 className="h1-skills">{name}</h1>
      </div>
    </li>
  )
}

export default Skills
