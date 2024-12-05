import ShopCmsBackendClient from "@/lib/shop-cms-backend-client";
import Feedback from "@/models/feedback";

class Feedbacks {
    static async getFeaturedFeedback(restaurant_id) {
        let json_feedbacks = await ShopCmsBackendClient.getRestaurantFeaturedFeedback(restaurant_id);

        if (json_feedbacks.length !== 0) {
            return json_feedbacks.map(json_feedback =>
                Feedback.fromJSON(json_feedback)
            );
        }

        return [];
    };

    static async getAllRestaurantFeedback(restaurant_id) {
        let json_feedbacks = await ShopCmsBackendClient.getRestaurantFeedback(restaurant_id);

        if (json_feedbacks.length !== 0) {
            return json_feedbacks.map(json_feedback =>
                Feedback.fromJSON(json_feedback)
            );
        }

        return [];
    };

    static createFeedback(restaurant_id, rating, comment) {
        let feedback = new Feedback({
            restaurant_id: restaurant_id,
            comment: comment,
            rating: rating
        });

        ShopCmsBackendClient.createRestaurantFeedback(feedback.toJSON());
    }

    static updateFeedbackFeaturedStatus(restaurant_id, featured_status) {
        ShopCmsBackendClient.updateFeedbackFeaturedStatus(restaurant_id, featured_status);
    }
}

export default Feedbacks;
