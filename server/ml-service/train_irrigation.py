from siri.models import Factory

# Load dataset and train an irrigation model
if __name__ == "__main__":
    path = "TARP.csv"  # your dataset
    print("🚀 Training Irrigation Planner Model...")

    # Create Random Forest model
    model = Factory.create_model('random_forest', path, n_estimators=100, random_state=42)
    acc = model.train_model()

    print(f"✅ Model trained successfully with accuracy: {acc*100:.2f}%")

    model.show_params()
    model.save_model("irrigation_model.pkl")
    print("💾 Model saved as irrigation_model.pkl")
