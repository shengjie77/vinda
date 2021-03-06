use super::entity::{Entity};

type CanvasEntity = Box<dyn Entity>;
type CanvasEntityVec = Vec<CanvasEntity>;

pub struct Canvas {
    entities: CanvasEntityVec,
}

impl Canvas {

    pub fn new() -> Canvas {
        Canvas {
            entities: Vec::new(),
        }
    }

    pub fn get_entities(&self) -> &CanvasEntityVec {
        &self.entities
    }

    pub fn add_entity(&mut self, entity: CanvasEntity) {
        self.entities.push(entity);
    }

}

#[cfg(test)]
mod test {

    use crate::canvas::{Canvas, Entity, EntityId};

    #[test]
    #[allow(non_snake_case)]
    fn add_entity__ok() {
        let mut canvas = Canvas::new();
        let entity = MokcEntity::default();
        let id = entity.id.clone();
        canvas.add_entity(Box::new(entity));

        let result = canvas.get_entities()
            .iter()
            .find(|&e| {
                &id == e.get_id()
            });

        assert_eq!(result.is_some(), true);
    }

    #[derive(Default)]
    struct MokcEntity {
        id: EntityId,
    }

    impl Entity for MokcEntity {

        fn get_id(&self) -> &EntityId {
            &self.id
        }

    }

}

