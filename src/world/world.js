import Box2D from './box2dweb'
import Entity from './entity'

const World = function (params) {
  const B2World = Box2D.Dynamics.b2World
  const B2Vec2 = Box2D.Common.Math.b2Vec2
  const B2ContactListener = Box2D.Dynamics.b2ContactListener

  const config = Object.assign({
    fps: 60,
    scale: 100,
    debug: false
  }, params)

  this.frame = 0
  this.fps = config.fps
  this.scale = config.scale
  this.debug = config.debug
  this.entities = {}
  this.bodies = {}
  this.world = new B2World(new B2Vec2(0, 0), true)
  this.contacts = new B2ContactListener()

  this.world.SetContactListener(this.contacts)

  this.contacts.BeginContact = (contact) => {
    this.onBeginContact(contact)
  }

  this.contacts.EndContact = (contact) => {
    this.onEndContact(contact)
  }

  this.contacts.PreSolve = (contact) => {
    this.onPreSolve(contact)
  }

  this.contacts.PostSolve = (contact) => {
    this.onPostSolve(contact)
  }
}

// ------------------------------------------------------------------ contacts

World.prototype.onBeginContact = function (contact) {}

World.prototype.onEndContact = function (contact) {}

World.prototype.onPreSolve = function (contact) {}

World.prototype.onPostSolve = function (contact) {}

// ---------------------------------------------------------------------- update

World.prototype.update = function () {
  this.frame++
  this.world.Step(1 / this.fps, 8, 3)
  this.world.ClearForces()
  for (const i in this.bodies) {
    if (!Object.prototype.hasOwnProperty.call(this.bodies, i)) {
      continue
    }

    // update positions
    const body = this.bodies[i]
    const entity = body.GetUserData()
    entity.x = this.getPosition(entity).x
    entity.y = this.getPosition(entity).y
    entity.a = this.getAngle(entity)
  }
}

// -------------------------------------------------------------------- entities

World.prototype.createEntity = function (params) {
  const config = Object.assign({
    id: this.createId(),
    x: 0,
    y: 0
  }, params)
  const entity = new Entity(config)
  this.entities[config.id] = entity
  return entity
}

World.prototype.getEntity = function (id) {
  return this.entities[id]
}

World.prototype.destroyEntity = function (entity) {
  if (entity) {
    this.destroyBody(entity)
    delete this.entities[entity.id]
  }
}

World.prototype.createId = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// ---------------------------------------------------------------------- bodies

World.prototype.destroyBody = function (entity) {
  if (entity) {
    entity.debug = {}
    const body = this.getBody(entity.id)
    this.world.DestroyBody(body)
    delete this.bodies[entity.id]
  }
}

World.prototype.createBody = function (entity, params) {
  if (entity) {
    const config = Object.assign({
      x: 0,
      y: 0,
      type: 'dynamic',
      active: true,
      allowSleep: true,
      awake: true,
      bullet: false,
      fixedRotation: false,
      angle: 0,
      angularDamping: 0,
      angularVelocity: 0,
      linearDamping: 0,
      linearVelocity: { x: 0, y: 0 },
      userData: entity
    }, params)

    const B2BodyDef = Box2D.Dynamics.b2BodyDef
    const B2Body = Box2D.Dynamics.b2Body
    const bodyDef = new B2BodyDef()
    bodyDef.position.x = config.x / this.scale
    bodyDef.position.y = config.y / this.scale
    bodyDef.active = config.active
    bodyDef.allowSleep = config.allowSleep
    bodyDef.awake = config.awake
    bodyDef.bullet = config.bullet
    bodyDef.fixedRotation = config.fixedRotation
    bodyDef.angle = config.angle
    bodyDef.angularDamping = config.angularDamping
    bodyDef.angularVelocity = config.angularVelocity
    bodyDef.linearDamping = config.linearDamping
    bodyDef.linearVelocity = config.linearVelocity
    bodyDef.userData = config.userData

    if (config.type === 'static') {
      bodyDef.type = B2Body.b2_staticBody
    }

    if (config.type === 'dynamic') {
      bodyDef.type = B2Body.b2_dynamicBody
    }

    if (config.type === 'kinematic') {
      bodyDef.type = B2Body.b2_kinematicBody
    }

    const body = this.world.CreateBody(bodyDef)
    body.active = true
    this.bodies[entity.id] = body
    return body
  }
}

World.prototype.getBody = function (entityId) {
  return this.bodies[entityId]
}

// -------------------------------------------------------------------- fixtures

World.prototype.getFixtureDef = function (config) {
  const B2FixtureDef = Box2D.Dynamics.b2FixtureDef
  const fixDef = new B2FixtureDef()
  fixDef.density = config.density
  fixDef.friction = config.friction
  fixDef.restitution = config.restitution
  fixDef.isSensor = config.isSensor
  return fixDef
}

// ---------------------------------------------------------------------- circle

World.prototype.addCircle = function (entity, params) {
  if (entity) {
    const config = Object.assign({
      x: 0,
      y: 0,
      radius: 25,
      density: 1,
      friction: 0.5,
      restitution: 0.5,
      isSensor: false
    }, params)
    const fixtureDefinition = this.getFixtureDef(config)
    const B2CircleShape = Box2D.Collision.Shapes.b2CircleShape
    const fixtureDef = fixtureDefinition
    fixtureDef.shape = new B2CircleShape(config.radius / this.scale)
    fixtureDef.shape.m_p = {
      x: config.x / this.scale,
      y: config.y / this.scale
    }
    const body = this.getBody(entity.id)
    body.CreateFixture(fixtureDef)

    if (this.debug) {
      entity.debug = {
        shape: 'circle',
        radius: config.radius
      }
    }
  }
}

// ------------------------------------------------------------------- rectangle

World.prototype.addRectangle = function (entity, params) {
  if (entity) {
    const config = Object.assign({
      width: 50,
      height: 50,
      x: 0,
      y: 0,
      density: 1,
      friction: 0.5,
      restitution: 0.5,
      isSensor: false
    }, params)
    const fixtureDef = this.getFixtureDef(config)
    const B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    fixtureDef.shape = new B2PolygonShape()
    fixtureDef.shape.SetAsBox(
      config.width * 0.5 / this.scale,
      config.height * 0.5 / this.scale
    )
    for (let i = 0; i < fixtureDef.shape.m_vertices.length; i++) {
      const vert = fixtureDef.shape.m_vertices[i]
      vert.x += config.x / this.scale || 0
      vert.y += config.y / this.scale || 0
    }
    fixtureDef.shape.m_centroid.x += config.x / this.scale || 0
    fixtureDef.shape.m_centroid.y += config.y / this.scale || 0

    const body = this.getBody(entity.id)
    body.CreateFixture(fixtureDef)

    if (this.debug) {
      entity.debug = {
        shape: 'rectangle',
        w: config.width,
        h: config.height
      }
    }
  }
}

// ----------------------------------------------------------------------- edges

World.prototype.addEdges = function (entity, params) {
  if (entity) {
    const config = Object.assign({
      ax: 0,
      ay: 0,
      bx: 0,
      by: 0,
      vertices: [],
      density: 1,
      friction: 0.5,
      restitution: 0.5,
      isSensor: false
    }, params)

    for (let i = 0; i < config.vertices.length; i++) {
      const fixtureDef = this.getFixtureDef(config)
      const B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
      fixtureDef.shape = new B2PolygonShape()
      config.ax = config.vertices[i].x / this.scale
      config.ay = config.vertices[i].y / this.scale
      config.bx = typeof config.vertices[i + 1] !== 'undefined' ? config.vertices[i + 1].x / this.scale : config.vertices[0].x / this.scale
      config.by = typeof config.vertices[i + 1] !== 'undefined' ? config.vertices[i + 1].y / this.scale : config.vertices[0].y / this.scale
      fixtureDef.shape.SetAsEdge({ x: config.ax, y: config.ay }, { x: config.bx, y: config.by })
      const body = this.getBody(entity.id)
      body.CreateFixture(fixtureDef)
    }

    if (this.debug) {
      entity.debug = {
        shape: 'edges',
        vertices: config.vertices
      }
    }
  }
}

// --------------------------------------------------------------------- polygon

World.prototype.addPolygon = function (entity, params) {
  if (entity) {
    const config = Object.assign({
      vertices: [],
      x: 0,
      y: 0,
      density: 1,
      friction: 0.5,
      restitution: 0.5,
      isSensor: false
    }, params)
    const fixtureDef = this.getFixtureDef(config)
    const B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    fixtureDef.shape = new B2PolygonShape()
    for (let i = 0; i < config.vertices.length; i++) {
      const vert = config.vertices[i]
      vert.x /= this.scale
      vert.y /= this.scale
    }
    fixtureDef.shape.SetAsArray(config.vertices, config.vertices.length)
    for (let i = 0; i < fixtureDef.shape.m_vertices.length; i++) {
      const vert = fixtureDef.shape.m_vertices[i]
      vert.x += config.x / this.scale || 0
      vert.y += config.y / this.scale || 0
    }
    const body = this.getBody(entity.id)
    body.CreateFixture(fixtureDef)

    if (this.debug) {
      for (let i = 0; i < config.vertices.length; i++) {
        const vert = config.vertices[i]
        vert.x *= this.scale
        vert.y *= this.scale
      }
      entity.debug = {
        shape: 'polygon',
        vertices: config.vertices
      }
    }
  }
}

// --------------------------------------------------------------------- getters

World.prototype.getPosition = function (entity) {
  if (entity) {
    const body = this.getBody(entity.id)
    if (body) {
      const position = body.GetPosition()
      return {
        x: position.x * this.scale,
        y: position.y * this.scale
      }
    }
  }
}

World.prototype.getAngle = function (entity) {
  if (entity) {
    const body = this.getBody(entity.id)
    if (body) {
      return body.GetAngle()
    }
  }
}

World.prototype.getLinearVelocity = function (entity) {
  if (entity) {
    const body = this.getBody(entity.id)
    if (body) {
      const linearVelocity = body.GetLinearVelocity()
      return {
        x: linearVelocity.x * this.scale,
        y: linearVelocity.y * this.scale
      }
    }
  }
}

// --------------------------------------------------------------------- setters

World.prototype.setGravity = function (config) {
  this.world.SetGravity(config)
}

World.prototype.setPosition = function (entity, config) {
  if (entity) {
    const body = this.getBody(entity.id)
    if (body) {
      body.SetPosition({
        x: config.x / this.scale,
        y: config.y / this.scale
      })
    }
  }
}

World.prototype.setAngle = function (entity, angle) {
  if (entity) {
    const body = this.getBody(entity.id)
    if (body) {
      body.SetAngle(angle)
    }
  }
}

World.prototype.setAngularVelocity = function (entity, omega) {
  if (entity) {
    const body = this.getBody(entity.id)
    if (body) {
      body.SetAngularVelocity(omega)
    }
  }
}

World.prototype.setLinearVelocity = function (entity, config) {
  if (entity) {
    const body = this.getBody(entity.id)
    if (body) {
      body.SetLinearVelocity({
        x: config.x / this.scale,
        y: config.y / this.scale
      })
    }
  }
}

// ---------------------------------------------------------------------- forces

World.prototype.applyForce = function (entity, config) {
  if (entity) {
    const body = this.getBody(entity.id)
    if (body) {
      body.ApplyForce(config, body.GetWorldCenter())
    }
  }
}

World.prototype.applyTorque = function (entity, torque) {
  if (entity) {
    const body = this.getBody(entity.id)
    if (body) {
      body.SetActive(true)
      body.SetAwake(true)
      body.ApplyTorque(torque / this.scale)
    }
  }
}

// -------------------------------------------------------------------- impulses

World.prototype.applyImpulse = function (entity, config) {
  if (entity) {
    const body = this.getBody(entity.id)
    if (body) {
      body.ApplyImpulse(config, body.GetWorldCenter())
    }
  }
}

export default World
